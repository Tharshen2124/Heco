import { db, storage } from "../../firebaseConfig";
import {
  TextAnalyticsClient,
  AzureKeyCredential,
} from "@azure/ai-text-analytics";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";

export const apiHandler = (() => {  
  /*
        review : {
            content,
            cost_rating
        }
        user: {
            name,
            id,
            image
        }
    */
  const uploadReview = async (facility_id, review, user) => {
    try {
      const client = new TextAnalyticsClient(
        process.env.NEXT_PUBLIC_COG_SERVICE_ENDPOINT,
        new AzureKeyCredential(process.env.NEXT_PUBLIC_COG_SERVICE_KEY)
      );

      const documents = [review.content];

      const results = await client.analyzeSentiment(documents);
      if (results[0].error !== undefined) {
        throw new Error("Encountered an error:" + results[0].error);
      }
      const sentiment = results[0].sentiment;

      const facilitySnapshot = await getDoc(doc(db, "facilities", facility_id));

      const reviewRef = await addDoc(collection(db, "reviews"), {
        author_id: user.id,
        facility_id: facility_id,
        author_name: user.name,
        image: user.image,
        review: review.content,
        timestamp: Date.now(),
      });

      const data = facilitySnapshot.data();

      data.cost_rating[review.cost_rating - 1] += 1;
      data.sentiment[
        sentiment === "neutral" || sentiment === "mixed"
          ? 1
          : sentiment === "negative"
          ? 0
          : 2
      ] += 1;
      data.reviews.push(reviewRef.id);

      await setDoc(doc(db, "facilities", facility_id), data);

      const userSnapshot = await getDoc(doc(db, "users", user.id));

      const userReviews =
        userSnapshot.data() === undefined ||
        userSnapshot.data().reviews === undefined
          ? []
          : userSnapshot.data().reviews;

      userReviews.push(reviewRef.id);

      await setDoc(doc(db, "users", user.id), {
        reviews: userReviews,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getReviewOfUser = async (user_id) => {
    const userSnapshot = await getDoc(doc(db, "users", user_id));

    if (
      userSnapshot.data() === undefined ||
      userSnapshot.data().reviews === undefined
    )
      return [];

    const q = query(
      collection(db, "reviews"),
      where("__name__", "in", userSnapshot.data().reviews)
    );
    const result = await getDocs(q);
    const ret = [];
    result.forEach((i) => ret.push(i.data()));
    ret.sort(function (a, b) {
      if (a.timestamp < b.timestamp) return 1;
      else return -1;
    });
    return ret;
  };

  const getReviewOfFacility = async (facility_id) => {
    const facilitySnapshot = await getDoc(doc(db, "facilities", facility_id));

    if (
      facilitySnapshot.data() === undefined ||
      facilitySnapshot.data().reviews === undefined ||
      facilitySnapshot.data().reviews.length === 0
    )
      return [];

    const q = query(
      collection(db, "reviews"),
      where("__name__", "in", facilitySnapshot.data().reviews)
    );
    const result = await getDocs(q);
    const ret = [];
    result.forEach((i) => ret.push(i.data()));
    ret.sort(function (a, b) {
      if (a.timestamp < b.timestamp) return 1;
      else return -1;
    });
    return ret;
  };

  const getFacilities = async () => {
    const result = await getDocs(collection(db, "facilities"));
    const ret = [];
    result.forEach((i) => ret.push({ ...i.data(), id: i.id }));
    return ret;
  };

  const getFacility = async (facility_id) => {
    const result = await getDoc(doc(db, "facilities", facility_id));
    return result.data();
  };

  const getFacilityImage = async (facility_id) => {
    const facility = await getDoc(doc(db, "facilities", facility_id));
    if (facility.data() === undefined || facility.data().images === undefined)
      return null;

    const length = facility.data().images.length;
    const result = [];

    for (let i = 0; i < length; i++) {
      const res = await getDownloadURL(
        ref(storage, `${facility.data().images[i]}`)
      );
      result.push(res);
    }
    return result;
  };

  return {
    uploadReview,
    getReviewOfUser,
    getReviewOfFacility,
    getFacilities,
    getFacility,
    getFacilityImage,
  };
})();

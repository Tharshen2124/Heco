import { db } from "../../firebaseConfig";
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
import { collection, addDoc, doc, getDoc, setDoc, query, where, getDocs } from "firebase/firestore";

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
            const client = new TextAnalyticsClient(process.env.NEXT_PUBLIC_COG_SERVICE_ENDPOINT, new AzureKeyCredential(process.env.NEXT_PUBLIC_COG_SERVICE_KEY));

            const documents = [
                review.content
            ];
        
            const results = await client.analyzeSentiment(documents);
            if (results[0].error !== undefined) {
                throw new Error("Encountered an error:" + results[0].error);
            }
            const sentiment = results[0].sentiment;

            const facilitySnapshot = await getDoc(doc(db, "facilities", facility_id));

            const reviewRef = await addDoc(collection(db, "reviews"), {
                author_id: user.id,
                author_name: user.name,
                image: user.image,
                review: review.content,
                timestamp: Date.now()
            });

            const data = facilitySnapshot.data();

            data.total_cost += review.cost_rating;
            data[sentiment] += 1;
            data.reviews.push(reviewRef.id);

            await setDoc(
                doc(db, 'facilities', facility_id),
                data
            );

            const userSnapshot = await getDoc(doc(db, 'users', user.id));

            const userReviews = userSnapshot.data().reviews === undefined ? [] : userSnapshot.data().reviews; 

            userReviews.push(reviewRef.id);

            await setDoc(
                doc(db, 'users',user.id),
                {
                    reviews : userReviews
                }
            );
        } catch (err) {
            console.log(err);
        }
    }

    const getReviewOfUser = async (user_id) => {
        const userSnapshot = await getDoc(doc(db, 'users', user_id));

        if (userSnapshot.data() === undefined || userSnapshot.data().reviews === undefined) return [];

        
        const q = query(collection(db, 'reviews'), where("__name__", 'in', userSnapshot.data().reviews));
        const result = await getDocs(q);
        const ret = [];
        result.forEach(i => ret.push(i.data()));
        return ret;
    }

    const getReviewOfFacility = async (facility_id) => {
        const facilitySnapshot = await getDoc(doc(db, 'facilities', facility_id));

        if (facilitySnapshot.data() === undefined || facilitySnapshot.data().reviews === undefined) return [];

        const q = query(collection(db, 'reviews'), where("__name__", 'in', facilitySnapshot.data().reviews));
        const result = await getDocs(q);
        const ret = [];
        result.forEach(i => ret.push(i.data()));
        console.log(ret);
        return ret;
    }

    const getFacilities = async () => {
        const result = await getDocs(collection(db, 'facilities'));
        const ret = [];
        result.forEach(i => ret.push(i.data()));
        return ret;
    }

    return {
        uploadReview,
        getReviewOfUser,
        getReviewOfFacility,
        getFacilities
    }
})();
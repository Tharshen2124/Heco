import { db } from "../../firebaseConfig";
import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

export const apiHandler = (() => {
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

    uploadReview('5ljZcg2fxA5yeb2ditJV', {content: 'good shit', cost_rating: 3}, {id: '1', name: 'hi', image: 'hi'});

    return {
        uploadReview
    }
})();
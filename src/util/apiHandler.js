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
                author: user.id,
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
        } catch (err) {
            console.log(err);
        }
    }

    return {
        uploadReview
    }
})();
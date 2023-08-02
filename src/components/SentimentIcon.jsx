import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodHappyIcon from "@mui/icons-material/TagFaces";
import NeutralIcon from '@mui/icons-material/SentimentSatisfied';

export default function SentimentIcon({ sentiment }) {
    if(sentiment === 'Mostly Positive') {
        return <MoodHappyIcon />
    } else if (sentiment === 'Mostly Negative') {
        return <MoodBadIcon />
    } else {
        return <NeutralIcon />
    }
}
export function timeAgo(timestamp) 
{
    const currentTime = Date.now();
    const difference = currentTime - timestamp;
    const differenceInSeconds = Math.floor(difference / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    let time;

    if (differenceInHours > 0) {
        time = `${differenceInHours} hours ago`;
    } else if (differenceInMinutes > 0) {
        time = `${differenceInMinutes} minutes ago`;
    } else {
        time = `${differenceInSeconds} seconds ago`;
    }
    return time;
}
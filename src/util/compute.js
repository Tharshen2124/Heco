
/*

For each factor, find min max,

calculate the relative value in terms of percentage for each factor

multiply by weight of factor

for the one with the most score, let it be 100%
 
>= 80, green

>= 50 yellow

red

*/

export default function compute(weight, facilities){
    const temp = []
    for(const i of facilities){
        temp.push({...i});
    }
    const d_range = [Infinity, -Infinity];
    const c_range = [Infinity, -Infinity];
    const s_range = [Infinity, -Infinity];
    const d_arr = [];
    const c_arr = [];
    const s_arr = [];
    for(let i = 0; i < temp.length; i++){
        let d = temp[i].distance;
        d_range[0] = Math.min(d_range[0], d);
        d_range[1] = Math.max(d_range[1], d);

        let c = 0;
        for(let j = 0; j < 5; j++){
            c += (j - 1 - (j <= 1 ? 1 : 0)) * temp[i].cost_rating[j] * temp[i].cost_rating[j];
        }
        if (c) c /= temp[i].reviews.length;

        c_range[0] = Math.min(c_range[0], c);
        c_range[1] = Math.max(c_range[1], c);


        let s = 0;
        for(let j = 0; j < 3; j++){
            s += (!j ? -1 : j) * temp[i].sentiment[j] * temp[i].sentiment[j];
        }
        if (s) s /= temp[i].reviews.length;

        s_range[0] = Math.min(s_range[0], s);
        s_range[1] = Math.max(s_range[1], s);

        d_arr.push(d);
        c_arr.push(c);
        s_arr.push(s);
    }

    let mx_score = -Infinity;
    const score = [];
    for(let i =0 ; i < temp.length; i++){
        const total = 
        (1 - ( (d_arr[i] - d_range[0]) / (d_range[1] - d_range[0] + 1) )) * weight['distance'] +
        ( (c_arr[i] - c_range[0]) / (c_range[1] - c_range[0] + 1) ) * weight['cost'] +
        ( (s_arr[i] - s_range[0]) / (s_range[1] - s_range[0] + 1) ) * weight['sentiment']
        score.push(total);
        mx_score = Math.max(mx_score, total);
    }

    let best_facility = "";
    for(let i = 0; i < temp.length; i++){
        if (score[i] === mx_score) best_facility = temp[i].id;
        temp[i].status = (
            score[i] / mx_score >= 0.8 ?
            "suitable"
            :
            score[i] / mx_score >= 0.5 ?
            "mod_suitable"
            :
            "less_suitable"
        );
    }

    return{
        best_facility,
        temp
    }
}
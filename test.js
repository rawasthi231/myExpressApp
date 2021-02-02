const promiseObj = new Promise((resolve, reject) => {
    // setTimeout(() => {
    //     let rollNo = [1, 2, 3, 4];
    //     resolve(rollNo);
    //     reject('Something went wrong.');
    // }, 2000);

        let rollNo = [1, 2, 3, 4];
        resolve(rollNo);
        reject('Something went wrong.');


});

let getBiodata = (index) => {
    return new Promise((resolve, reject) => {
        setTimeout((index) => {
            let data = {
                name: "Raghav Awasthi",
                age: "24"
            };
            resolve(`Roll no. - ${index}, Name - ${data.name}, Age - ${data.age}`);
            reject('Error while processing');
        }, 2000, index)
    });
}

promiseObj.then((rollNo) => {
    console.log(rollNo);
    return getBiodata(rollNo[1]);
}).then((message) => {
    console.log(message);
}).catch((error) => {
    console.log(error);
});


async function getData(){
    const roll_no = await promiseObj;
    console.log(roll_no);

    const data = await getBiodata(roll_no[2]);
    console.log(data);
}

getData()
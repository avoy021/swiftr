const promise = (arg) => {
    return new Promise((resolve,reject) => {
        if(arg === "resolve") {
            resolve("Promise has been resolved");
        }
        else {
            reject("Promise has been rejected");
        }
    })
}

const func = async() => {
    try {
        const res = await promise("reject");
        console.log(res);
    } catch (error) {
        console.log(error)
    }
}

func();
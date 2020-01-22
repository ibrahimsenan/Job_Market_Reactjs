import JobsDataSet from '../constants/dataSet';

let myLocalDataStore = [];

class DataSetRequestHandler {
    getJobsDataSetRequester() {
        return new Promise((resolve, reject) => {
            try {
                myLocalDataStore = JSON.parse(localStorage.getItem("jobDataSet"));
                if (myLocalDataStore !== null) {
                    resolve(myLocalDataStore);
                } else {
                    localStorage.setItem("jobDataSet", JSON.stringify(JobsDataSet));
                    myLocalDataStore = JSON.parse(localStorage.getItem("jobDataSet"));
                    if (myLocalDataStore.length > 0) {
                        resolve(myLocalDataStore);
                    } else {
                        resolve("No Jobs Available");
                    }
                }

            } catch (error) {
                reject(error)
            }
        })
    }

    postJobsDataSetRequester(jobCollection) {
        return new Promise((resolve, reject) => {
            try {
                let charRand = 'abcdefghijklmnopqrstuvwxyz0123456789'
                let randomId = '';
                for (let i = 0; i < 6; i++) {
                    randomId += charRand.charAt(Math.floor(Math.random() * charRand.length));
                }
                jobCollection._id = randomId;

                if (myLocalDataStore.length > 0) {
                    myLocalDataStore = JSON.parse(localStorage.getItem("jobDataSet"));
                    myLocalDataStore.push(jobCollection);
                    localStorage.setItem("jobDataSet", JSON.stringify(myLocalDataStore));
                    resolve(myLocalDataStore);
                }else {
                    myLocalDataStore.push(jobCollection);
                    localStorage.setItem("jobDataSet", JSON.stringify(myLocalDataStore));
                    resolve(myLocalDataStore);
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    updateJobsDataSetRequester(jobCollection, jobCollectionIndex) {
        return new Promise((resolve, reject) => {
            try {
                if (myLocalDataStore.length > 0) {
                    myLocalDataStore = JSON.parse(localStorage.getItem("jobDataSet"));
                    myLocalDataStore[jobCollectionIndex] = jobCollection;
                    localStorage.setItem("jobDataSet", JSON.stringify(myLocalDataStore));
                    resolve(myLocalDataStore);
                }
            } catch (error) {
                reject(error)
            }
        })
    }

    deleteJobsDataSetRequester(jobCollection_Id, jobCollection_Index) {
        return new Promise((resolve, reject) => {
            try {
                myLocalDataStore = JSON.parse(localStorage.getItem("jobDataSet"));
                myLocalDataStore.splice(jobCollection_Index, 1);
                localStorage.setItem("jobDataSet", JSON.stringify(myLocalDataStore));
                resolve(myLocalDataStore);
            } catch (error) {
                reject(error)
            }
        })
    }
}

export default DataSetRequestHandler;
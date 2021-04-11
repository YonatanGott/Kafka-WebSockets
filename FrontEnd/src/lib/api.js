import axios from "axios";

const baseUrl = "http://localhost:5000";

// Get all Logs
export async function getAllLogs() {
    try {
        const res = await axios.get(baseUrl + "/api/logs");
        const data = res.data;
        return data
    } catch (error) {
        console.error(error);
    }
};
// Send log to Topic
export async function sendLog(topic, id) {
    try {
        const response = await axios.post(baseUrl + "/api/logs", {
            id: id,
            topic: topic,
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}
// Get All Topics
export async function getAllTopics() {
    try {
        const res = await axios.get(baseUrl + "/api/topics");
        const data = res.data;
        return data
    } catch (error) {
        console.error(error);
    }
};
// Send Chosen Topics
export async function sendAnalyticsTopics(topics) {
    try {
        const response = await axios.post(baseUrl + "/api/topics", {
            topics: topics,
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}
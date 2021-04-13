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
// Pagination
export async function logPagination(page) {
    try {
        const response = await axios.post(baseUrl + "/api/logs/pagination", {
            page: page,
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}
// Send log to Topic
export async function sendLog(id) {
    try {
        const response = await axios.post(baseUrl + "/api/logs", {
            id: id,
        });
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
}
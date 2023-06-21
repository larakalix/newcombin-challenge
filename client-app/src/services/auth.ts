export const fetchAuth = async () => {
    const url = "http://localhost:8081/auth";
    const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: "sarah",
            password: "connor",
        }),
    };

    const response = await fetch(url, options);
    const data = await response.json();
    return data;
};

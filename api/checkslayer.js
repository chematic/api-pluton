export default async function handler(req, res) {
    try {
        const response = await fetch(
            "https://raw.githubusercontent.com/chematic/storage/refs/heads/main/api/v1/checkslayer.txt"
        )
        
        if (!response.ok) {
            return res.status(500).send("OFF")
        }

        const status = await response.text()

        res.setHeader("Content-Type", "text/plain")
        res.status(200).send(status.trim())
    } catch (error) {
        res.status(500).send("OFF")
    }
}

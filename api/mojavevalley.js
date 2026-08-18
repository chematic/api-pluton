export default async function handler(req, res) {
    if (req.headers.auth !== "@vhb7") {
        return res.status(403).send("Forbidden")
    }

    const response = await fetch(
        "https://raw.githubusercontent.com/chematic/storage/refs/heads/main/api/v1/mojavevalleyhub.luau"
    )

    const script = await response.text()

    res.setHeader("Content-Type", "text/plain")
    res.send(script)
}

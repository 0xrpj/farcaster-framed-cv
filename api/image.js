import sharp from "sharp";
import path from 'path';

export default async (req, context) => {
    const host = process.env.URL;
    const url = new URL(req.url);
    const preference = Number(url.searchParams.get('preference')) || 0;

    let imgTitle = "banner";

    if (preference === 1) {
        imgTitle = "banner";
    } else if (preference === 2) {
        imgTitle = "about-section";
    } else if (preference === 3) {
        imgTitle = "education";
    } else if (preference === 4) {
        imgTitle = "experience";
    }

    const imgResponse = await fetch(`${host}/images/${imgTitle}.png`);

    if (!imgResponse.ok) {
        return new Response("Image not found", { status: 404 });
    }

    const imgBuffer = await imgResponse.arrayBuffer();
    const response = await sharp(Buffer.from(imgBuffer)).toBuffer();

    return new Response(response,
        {
            status: 200,
            headers: { 'Content-Type': 'image/png' }
        }
    );
}

export const config = {
    path: "/image"
};

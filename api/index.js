export default async (req, context) => {
    const host = process.env.URL;

    let buttonIndex = 1;

    try {
        const body = await new Response(req.body).json();
        buttonIndex = body.untrustedData.buttonIndex;
    } catch (e) { }

    const imagePath = `${host}/image?preference=${parseInt(buttonIndex)}`;

    const html = `
        <!doctype html>
        <body>
        <head>
        <style>
            figure {
                display: inline-block;
                margin: 0;
                max-width: 100%;
            }
            img {
                max-width: 100%;
                border: 4px inset black;
            }
        </style>
        <meta property="og:image" content="${imagePath}" />
        <meta property="fc:frame" content="vNext" />
        <meta property="fc:frame:image" content="${imagePath}" />
        <meta property="fc:frame:button:1" content="Banner" />
        <meta property="fc:frame:button:2" content="About Me" />
        <meta property="fc:frame:button:3" content="Education" />
        <meta property="fc:frame:button:4" content="Experience" />
        <title>Roshan Parajuli</title>
        </head>
            <figure>
            <img width="600" src="${imagePath}" />
            </figure>
        </body>
        </html>
    `;

    return new Response(html, {
        status: 200,
        headers: { 'Content-Type': 'text/html' },
    });
};

export const config = {
    path: "/",
};

import {
    S3Client,
	PutObjectCommand,
} from "@aws-sdk/client-s3";

const accountid = process.env.CLOUDFLARE_ACCOUNT_ID;
const accessKey = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const secretKey = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const bucketName = process.env.CLOUDFLARE_R2_BUCKET_NAME;

const s3 = new S3Client({
    region: "auto", // Required by AWS SDK, not used by R2
	endpoint: `https://${accountid}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: `${accessKey}`,
		secretAccessKey: `${secretKey}`,
	},
});

export async function uploadImage(file: File, key: string) {

    const buffer = Buffer.from(await file.arrayBuffer()); 
    await s3.send(
        new PutObjectCommand({
            Bucket: `${bucketName}`,
            Key: key,
            Body: buffer,
            ContentType: file.type,
        })
    );

    return key
}
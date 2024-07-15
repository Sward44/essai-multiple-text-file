import multer from "multer";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

const upload = multer({ dest: "./public/uploads" });
console.log(upload);

export async function POST(request) {
  const data = await request.formData();
  console.log(data);
  const file = data.get("file");
  console.log(file);

  if (!file) {
    return NextResponse.error(new Error("No file uploaded"), { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const filePath = `./public/uploads/${file.name}`;
  await writeFile(filePath, buffer);

  return NextResponse.json({ message: "File uploaded" }, { status: 200 });
}

// import nextConnect from "next-connect";
// import multer from "multer";
// import path from "path";

// // Création du répertoire 'uploads' si el n'existe pas déjà
// const uploadsDir = path.join(process.cwd(), "uploads");
// import fs from "fs";
// if (!fs.existsSync(uploadsDir)) {
//   fs.mkdirSync(uploadsDir);
// }

// // Configuration de stockage pour multer
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, uploadsDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}-${file.originalname}`);
//   },
// });

// // Configuration des filtres pour accepter les types de fichiers spécifiques
// const fileFilter = (req, file, cb) => {
//   const acceptedMimetypes = [
//     "image/png",
//     "image/jpeg",
//     "image/jpg",
//     "image/webp",
//     "image/heic",
//   ];

//   if (acceptedMimetypes.includes(file.mimetype)) {
//     cb(null, true);
//   } else {
//     cb(new Error("Type de fichier non pris en charge"), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter,
//   limits: { fileSize: 10 * 2500 * 2500 }, // 10MB max file size
// });

// // Utilisation de nextConnect pour gérer le middleware dans Next.js
// const apiRoute = nextConnect({
//   onError(error, req, res) {
//     res
//       .status(501)
//       .json({ error: `Une erreur est survenue: ${error.message}` });
//   },
//   onNoMatch(req, res) {
//     res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
//   },
// });

// // Ajouter le middleware multer à l'API Route
// apiRoute.use(upload.array("file", 10));

// apiRoute.post((req, res) => {
//   console.log("Files uploaded:", req.files);
//   res.status(200).json({
//     message: "Fichiers téléchargés avec succès",
//     files: req.files,
//   });
// });

// export default apiRoute;

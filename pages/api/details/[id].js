import db from "lib/db";
import auth from "middleware/auth";
import Details from "models/Details";
import sendError from "utils/sendError";

export default async function (req, res) {
  switch (req.method) {
    case "GET":
      await getDetails(req, res);
      break;

    case "PUT":
      await updateDetails(req, res);
      break;
  }
}

const getDetails = async (req, res) => {
  try {
    const { id } = req.query;
    await db.connect();
    const details = await Details.findOne({ category_id: id });
    await db.disconnect();

    res.status(200).json({ details });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

const updateDetails = async (req, res) => {
  try {
    const result = await auth(req, res);
    if (!result) return sendError(res, 400, "توکن احراز هویت نامعتبر است");

    const { id } = req.query;

    await db.connect();
    await Details.findOneAndUpdate({ category_id: id }, req.body);
    await db.disconnect();

    res.status(200).json({ msg: "مشخصات دسته بندی با موفقیت بروزرسانی شد" });
  } catch (error) {
    sendError(res, 500, error.message);
  }
};

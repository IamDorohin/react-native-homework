import {
  updateDoc,
  increment,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const addLikeHandler = async (initPostsArray, id, userId) => {
  const likesRef = doc(db, "posts", id);

  initPostsArray?.map((post) => {
    if (!post.likes.includes(userId)) {
      updateDoc(likesRef, {
        likesNumber: increment(1),
        likes: arrayUnion(userId),
      });
    } else {
      updateDoc(likesRef, {
        likesNumber: increment(-1),
        likes: arrayRemove(userId),
      });
    }
  });
};

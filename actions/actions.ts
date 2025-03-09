"use server";

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
  await auth.protect();
  const { sessionClaims } = await auth();
  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Document",
    type: "document"
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email as string)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email as string,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id
    });

  return { docId: docRef.id };
}

export async function createNewBoard() {
  await auth.protect();
  const { sessionClaims } = await auth();
  const docCollectionRef = adminDb.collection("documents");
  const docRef = await docCollectionRef.add({
    title: "New Board",
    type: "board"
  });

  await adminDb
    .collection("users")
    .doc(sessionClaims?.email as string)
    .collection("rooms")
    .doc(docRef.id)
    .set({
      userId: sessionClaims?.email as string,
      role: "owner",
      createdAt: new Date(),
      roomId: docRef.id
    });

  return { boardId: docRef.id };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function deleteDocument(roomId: string) {
  await auth.protect();
  try {
    await adminDb.collection("documents").doc(roomId).delete();
    const query = await adminDb
      .collectionGroup("rooms")
      .where("roomId", "==", roomId)
      .get();

    const batch = adminDb.batch();
    query.forEach((doc) => batch.delete(doc.ref));

    await batch.commit();
    await liveblocks.deleteRoom(roomId);
    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

export async function inviteUserToRoom(roomId: string, email: string) {
  await auth.protect();
  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .set({
        userId: email,
        role: "editor",
        createdAt: new Date(),
        roomId
      });

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

export async function removeUserFromDocument(roomId: string, email: string) {
  try {
    await adminDb
      .collection("users")
      .doc(email)
      .collection("rooms")
      .doc(roomId)
      .delete();

    return { success: true };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

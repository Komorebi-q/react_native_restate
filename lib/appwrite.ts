import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

export const config = {
  platform: "com.komoq.restate",
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  galleriesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  propertiesCollectionId:
    process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID
};
export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform);

export const avatar = new Avatars(client);
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  await logout();
  try {
    const redirectUri = Linking.createURL("/");
    const resp = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );

    if (!resp) {
      throw new Error("Create OAuth2 token failed");
    }

    const browserRes = await openAuthSessionAsync(resp.toString(), redirectUri);
    if (browserRes.type !== "success") {
      throw new Error("Create OAuth2 token failed");
    }

    const url = new URL(browserRes.url);
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) {
      throw new Error("Create OAuth2 token failed");
    }

    const session = await account.createSession(userId, secret);

    if (!session) {
      throw new Error("Failed to create session");
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession("current");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const user = await account.get();
    if (user.$id) {
      const userAvatar = avatar.getInitials(user.name);
      console.log("userAvatar", user.name, userAvatar.toString());

      return {
        ...user,
        avatar: userAvatar.toString()
      };
    }
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getLatestProperties() {
  try {
    const res = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc("$createdAt"), Query.limit(5)]
    );
    return res.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQueries = [Query.orderAsc("$createdAt")];
    if (filter && filter !== "all")
      buildQueries.push(Query.equal("type", filter));
    if (query)
      buildQueries.push(
        Query.or([
          Query.search("name", query),
          Query.search("address", query),
          Query.search("type", query)
        ])
      );
    if (limit) buildQueries.push(Query.limit(limit));

    const res = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQueries
    );

    return res.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

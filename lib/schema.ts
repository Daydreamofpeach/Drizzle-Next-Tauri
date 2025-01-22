import * as posts from "@/schema/posts";
import * as users from "@/schema/users";
import * as authTables from "@/schema/auth-tables";

export const schema = {
  ...posts,
  ...users,
  ...authTables,
}
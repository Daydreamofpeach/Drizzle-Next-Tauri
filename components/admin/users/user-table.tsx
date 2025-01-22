import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Sortable } from "@/components/sortable";
import { UsersWithRelationsList } from "@/queries/user-queries";

export function UserTable({ userList }: { userList: UsersWithRelationsList }) {
  return (
    <Table>
      <TableHeader className="bg-background">
        <TableRow>
          <TableHead><Sortable column="id">Id</Sortable></TableHead>
          <TableHead><Sortable column="name">Name</Sortable></TableHead>
          <TableHead><Sortable column="email">Email</Sortable></TableHead>
          <TableHead><Sortable column="emailVerified">Email Verified</Sortable></TableHead>
          <TableHead><Sortable column="image">Image</Sortable></TableHead>
          <TableHead><Sortable column="role">Role</Sortable></TableHead>
          <TableHead><Sortable column="password">Password</Sortable></TableHead>
          <TableHead><Sortable column="createdAt">Created At</Sortable></TableHead>
          <TableHead><Sortable column="updatedAt">Updated At</Sortable></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { userList.map((userObj) => (
          <TableRow key={ userObj.id }>
            <TableCell>{ userObj.id }</TableCell>
            <TableCell>{ userObj.name }</TableCell>
            <TableCell>{ userObj.email }</TableCell>
            <TableCell>{ userObj.emailVerified?.toLocaleString() }</TableCell>
            <TableCell>{ userObj.image }</TableCell>
            <TableCell>{ userObj.role }</TableCell>
            <TableCell>{ userObj.password }</TableCell>
            <TableCell>{ userObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ userObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell>
              <div className="flex gap-2 text-blue-400">
                <Link href={`/admin/users/${ userObj.id }`} className="flex text-sm items-center gap-2">
                  View
                </Link>
                <Link href={`/admin/users/${ userObj.id }/edit`} className="flex text-sm items-center gap-2">
                  Edit
                </Link>
                <Link href={`/admin/users/${ userObj.id }/delete`} className="flex text-sm items-center gap-2">
                  Delete
                </Link>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

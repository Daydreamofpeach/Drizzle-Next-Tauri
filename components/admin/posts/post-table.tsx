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
import { PostsWithRelationsList } from "@/queries/post-queries";

export function PostTable({ postList }: { postList: PostsWithRelationsList }) {
  return (
    <Table>
      <TableHeader className="bg-background">
        <TableRow>
          <TableHead><Sortable column="id">Id</Sortable></TableHead>
          <TableHead><Sortable column="title">Title</Sortable></TableHead>
          <TableHead><Sortable column="content">Content</Sortable></TableHead>
          <TableHead><Sortable column="createdAt">Created At</Sortable></TableHead>
          <TableHead><Sortable column="updatedAt">Updated At</Sortable></TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        { postList.map((postObj) => (
          <TableRow key={ postObj.id }>
            <TableCell>{ postObj.id }</TableCell>
            <TableCell>{ postObj.title }</TableCell>
            <TableCell>{ postObj.content }</TableCell>
            <TableCell>{ postObj.createdAt?.toLocaleString() }</TableCell>
            <TableCell>{ postObj.updatedAt?.toLocaleString() }</TableCell>
            <TableCell>
              <div className="flex gap-2 text-blue-400">
                <Link href={`/admin/posts/${ postObj.id }`} className="flex text-sm items-center gap-2">
                  View
                </Link>
                <Link href={`/admin/posts/${ postObj.id }/edit`} className="flex text-sm items-center gap-2">
                  Edit
                </Link>
                <Link href={`/admin/posts/${ postObj.id }/delete`} className="flex text-sm items-center gap-2">
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

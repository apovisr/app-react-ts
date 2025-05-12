import { GroupDto, UserDto } from "dto/all.dto";
import Link from "next/link";

export default async function Page() {

  const users: UserDto[] = await fetch(`http://127.0.0.1:3001/users`).then((res) => res.json())
  const groups: GroupDto[] = await fetch(`http://127.0.0.1:3001/groups`).then((res) => res.json())

  return <div>
    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      href="/user">crear user</Link>
    <Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      href="/group">crear Grupo</Link>
          <ul role="list" className="divide-y divide-gray-100">
            {
              users.map((e, index) => {
                  return <li key={index} className="flex justify-center gap-x-6 py-5">
                        {e.name}
                      </li>
              })
            }
          </ul>
          <ul role="list" className="divide-y divide-gray-100">
            {
              groups.map((e, index) => {
                  return <li key={index} className="flex justify-center gap-x-6 py-5">
                    <Link href={`/group/${e.id}`}>{e.name}</Link>
                      </li>
              })
            }
          </ul>
  </div>
}
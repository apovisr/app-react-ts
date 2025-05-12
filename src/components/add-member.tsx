'use client'
import { UserDto } from "dto/all.dto";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function AddMemberGroup( {users, id }: { users: UserDto[], id: string }) {

    const [currentUserId, setCurrentUserId] = useState('');

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault()

        try {
            await fetch('/api/groupMembers', {
                method: 'POST',
                body: JSON.stringify({
                    userId: event.target[0].value,
                    groupId: id
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            // ...
        } catch (error) {
            // Capture the error message to display to the user
            console.error(error)
        } finally {

        }
        redirect(`/group/${id}`)
    }

    return <form onSubmit={onSubmit}>

        <h1>Users</h1>
        <ul>
            {users.map((user) => (
                <li key={user.id}>
                    {user.name} - {user.id}
                </li>
            ))}
        </ul>

        <h2>Add Group Member</h2>
        <label htmlFor='currentUserId'>Name</label>
        <input type='string' name='currentUserId' id='currentUserId' 
            required value={currentUserId} onChange={(e) => setCurrentUserId(e.target.value)}  />
        <button type="submit">Add Member</button>
    </form>
}
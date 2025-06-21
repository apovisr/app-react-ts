'use client'
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Page() {

    const [formData, setFormData] = useState({
        name: '',
        description: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

    };

        async function onSubmit(event: React.FormEvent) {
            event.preventDefault()
    
            try {
                await fetch('/api/users', {
                    method: 'POST',
                    body: JSON.stringify(formData),
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
            redirect(`/`)
        }

    return <form onSubmit={onSubmit}>
        <div>
            <label htmlFor='name'>Name</label>
            <input type='string' name='name' id='name' required value={formData.name} onChange={handleChange} />
        </div>

        <div>
            <label htmlFor='description'>Descripcion</label>
            <input type='string' name='description' id='description' required value={formData.description} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
    </form>
}
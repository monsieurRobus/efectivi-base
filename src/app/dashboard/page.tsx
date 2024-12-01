import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter} from '@/components/atoms/card'
import ProtectedLayout from '@/context/ProtectedLayout'
import React from 'react'

type PageProps = {}

const page = (props: PageProps) => {
  return (
    <ProtectedLayout>
        <main>
            <Card>
                <CardHeader>
                    <CardTitle>Dashboard</CardTitle>
                    <CardDescription>Dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Welcome to the dashboard</p>

                </CardContent>
                
            </Card>

        </main>
    </ProtectedLayout>
  )
}

export default page
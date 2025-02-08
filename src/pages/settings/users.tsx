import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Plus, UserPlus, Mail, Lock, Shield } from "lucide-react"

// Mock data
const mockUsers = [
  {
    id: 1,
    name: "Admin User",
    email: "admin@example.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-02-08 15:30"
  },
  {
    id: 2,
    name: "John Manager",
    email: "john@example.com",
    role: "Manager",
    status: "active",
    lastLogin: "2024-02-08 14:15"
  },
  {
    id: 3,
    name: "Sarah Operator",
    email: "sarah@example.com",
    role: "Operator",
    status: "inactive",
    lastLogin: "2024-02-07 09:45"
  }
]

const roles = ["Admin", "Manager", "Operator", "Viewer"]

export default function UsersPage() {
  const [users, setUsers] = useState(mockUsers)
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "",
    password: ""
  })

  const handleAddUser = () => {
    if (newUser.name && newUser.email && newUser.role) {
      setUsers([
        ...users,
        {
          id: users.length + 1,
          ...newUser,
          status: "active",
          lastLogin: "-"
        }
      ])
      // Reset form
      setNewUser({
        name: "",
        email: "",
        role: "",
        password: ""
      })
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Gebruikersbeheer</h1>
          <p className="text-muted-foreground">
            Beheer gebruikers en hun toegangsrechten
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Nieuwe Gebruiker
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nieuwe Gebruiker Toevoegen</DialogTitle>
              <DialogDescription>
                Vul de gegevens in van de nieuwe gebruiker
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Naam</label>
                <Input
                  value={newUser.name}
                  onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                  placeholder="Volledige naam"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <Input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                  placeholder="email@bedrijf.be"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Rol</label>
                <Select
                  value={newUser.role}
                  onValueChange={(value) => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecteer een rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Wachtwoord</label>
                <Input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                  placeholder="Tijdelijk wachtwoord"
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <DialogTrigger asChild>
                <Button variant="outline">Annuleren</Button>
              </DialogTrigger>
              <Button onClick={handleAddUser}>Gebruiker Toevoegen</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Gebruikers Overzicht</CardTitle>
          <CardDescription>
            Alle gebruikers en hun toegangsniveaus
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Laatste Login</TableHead>
                <TableHead className="text-right">Acties</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "active" ? "default" : "secondary"}>
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{user.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Lock className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Shield className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
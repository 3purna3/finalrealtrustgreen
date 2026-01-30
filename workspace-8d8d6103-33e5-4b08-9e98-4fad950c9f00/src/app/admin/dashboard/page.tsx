'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Mail,
  Plus,
  Trash2,
  LogOut,
  ArrowRight,
  Image as ImageIcon,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  // Data states
  const [projects, setProjects] = useState<any[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  const [subscribers, setSubscribers] = useState<any[]>([]);

  // Form states
  const [projectForm, setProjectForm] = useState({ 
    name: '', 
    description: '', 
    image: null as File | null, 
    imageUrl: '', 
    imageSource: 'file' as 'file' | 'url' 
  });
  const [clientForm, setClientForm] = useState({ 
    name: '', 
    description: '', 
    designation: '', 
    image: null as File | null, 
    imageUrl: '', 
    imageSource: 'file' as 'file' | 'url' 
  });
  const [submitting, setSubmitting] = useState(false);

  // Stats
  const [stats, setStats] = useState({ projects: 0, clients: 0, contacts: 0, subscribers: 0 });

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Validate token with backend
    const validateToken = async () => {
      try {
        const response = await fetch('/api/admin/validate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        if (!response.ok) {
          localStorage.removeItem('adminToken');
          localStorage.removeItem('adminUser');
          router.push('/admin/login');
          return;
        }

        fetchData();
      } catch (error) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        router.push('/admin/login');
      }
    };

    validateToken();
  }, [router]);

  const fetchData = async () => {
    try {
      const [projectsRes, clientsRes, contactsRes, subscribersRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/clients'),
        fetch('/api/contact'),
        fetch('/api/subscribers'),
      ]);

      const projectsData = await projectsRes.json();
      const clientsData = await clientsRes.json();
      const contactsData = await contactsRes.json();
      const subscribersData = await subscribersRes.json();

      setProjects(projectsData);
      setClients(clientsData);
      setContacts(contactsData);
      setSubscribers(subscribersData);

      setStats({
        projects: projectsData.length,
        clients: clientsData.length,
        contacts: contactsData.length,
        subscribers: subscribersData.length,
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load data. Please refresh.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check image source
    if (projectForm.imageSource === 'file') {
      if (!projectForm.image) {
        toast({
          title: 'Error',
          description: 'Please select an image file.',
          variant: 'destructive',
        });
        return;
      }
    } else if (projectForm.imageSource === 'url') {
      if (!projectForm.imageUrl.trim()) {
        toast({
          title: 'Error',
          description: 'Please enter a valid image URL.',
          variant: 'destructive',
        });
        return;
      }
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', projectForm.name);
    formData.append('description', projectForm.description);
    formData.append('imageSource', projectForm.imageSource);

    if (projectForm.imageSource === 'file' && projectForm.image) {
      formData.append('image', projectForm.image);
    } else {
      formData.append('imageUrl', projectForm.imageUrl);
    }

    const response = await fetch('/api/projects', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'Project added successfully!',
      });
      setProjectForm({ 
        name: '', 
        description: '', 
        image: null, 
        imageUrl: '', 
        imageSource: 'file' 
      });
      fetchData();
    } else {
      throw new Error('Failed to add project');
    }

    setSubmitting(false);
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check image source
    if (clientForm.imageSource === 'file') {
      if (!clientForm.image) {
        toast({
          title: 'Error',
          description: 'Please select an image file.',
          variant: 'destructive',
        });
        return;
      }
    } else if (clientForm.imageSource === 'url') {
      if (!clientForm.imageUrl.trim()) {
        toast({
          title: 'Error',
          description: 'Please enter a valid image URL.',
          variant: 'destructive',
        });
        return;
      }
    }

    setSubmitting(true);

    const formData = new FormData();
    formData.append('name', clientForm.name);
    formData.append('description', clientForm.description);
    formData.append('designation', clientForm.designation);
    formData.append('imageSource', clientForm.imageSource);

    if (clientForm.imageSource === 'file' && clientForm.image) {
      formData.append('image', clientForm.image);
    } else {
      formData.append('imageUrl', clientForm.imageUrl);
    }

    const response = await fetch('/api/clients', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      toast({
        title: 'Success',
        description: 'Client added successfully!',
      });
      setClientForm({ 
        name: '', 
        description: '', 
        designation: '', 
        image: null, 
        imageUrl: '', 
        imageSource: 'file' 
      });
      fetchData();
    } else {
      throw new Error('Failed to add client');
    }

    setSubmitting(false);
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
      const response = await fetch(`/api/${type}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Item deleted successfully!',
        });
        fetchData();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete item.',
        variant: 'destructive',
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
    toast({
      title: 'Logged Out',
      description: 'You have been logged out successfully.',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">RT</span>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                REAL TRUST
              </span>
              <div className="text-xs text-slate-500">Admin Dashboard</div>
            </div>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <main className="container px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Total Projects</CardTitle>
              <LayoutDashboard className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-600">{stats.projects}</div>
            </CardContent>
          </Card>
          <Card className="border-teal-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Happy Clients</CardTitle>
              <Users className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-teal-600">{stats.clients}</div>
            </CardContent>
          </Card>
          <Card className="border-emerald-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Contact Submissions</CardTitle>
              <MessageSquare className="h-5 w-5 text-emerald-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-emerald-600">{stats.contacts}</div>
            </CardContent>
          </Card>
          <Card className="border-teal-100 hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Subscribers</CardTitle>
              <Mail className="h-5 w-5 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-teal-600">{stats.subscribers}</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-12">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LayoutDashboard className="h-5 w-5 text-emerald-600" />
                    Recent Projects
                  </CardTitle>
                  <CardDescription>Latest 3 projects added</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {projects.slice(0, 3).map((project) => (
                      <div key={project.id} className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
                        <img src={project.imageUrl} alt={project.name} className="h-12 w-12 object-cover rounded" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm truncate">{project.name}</h4>
                          <p className="text-xs text-slate-500 truncate">{project.description}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-emerald-600 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-teal-600" />
                    Recent Clients
                  </CardTitle>
                  <CardDescription>Latest 3 clients added</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {clients.slice(0, 3).map((client) => (
                      <div key={client.id} className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg">
                        <img src={client.imageUrl} alt={client.name} className="h-12 w-12 object-cover rounded-full" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm">{client.name}</h4>
                          <p className="text-xs text-teal-600">{client.designation}</p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-teal-600 flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects" className="space-y-6">
            <Card className="border-emerald-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-emerald-600" />
                  Add New Project
                </CardTitle>
                <CardDescription>Create a new project with image (file or URL)</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddProject} className="space-y-4">
                  <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
                    <div className="text-sm font-semibold mb-3">Choose Image Source</div>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="projectImageSource"
                          value="file"
                          checked={projectForm.imageSource === 'file'}
                          onChange={() => setProjectForm({ ...projectForm, imageSource: 'file', imageUrl: '' })}
                          className="w-4 h-4"
                        />
                        <span>Upload File</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="projectImageSource"
                          value="url"
                          checked={projectForm.imageSource === 'url'}
                          onChange={() => setProjectForm({ ...projectForm, imageSource: 'url', imageUrl: '' })}
                          className="w-4 h-4"
                        />
                        <span>Image URL</span>
                      </label>
                    </div>

                    {projectForm.imageSource === 'file' && (
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Upload Image</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.files?.[0] || null, imageSource: 'file' })}
                          required
                          className="h-11"
                        />
                      </div>
                    )}

                    {projectForm.imageSource === 'url' && (
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Image URL</Label>
                        <Input
                          required
                          placeholder="https://example.com/image.jpg"
                          value={projectForm.imageUrl}
                          onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value, imageSource: 'url' })}
                          className="h-11"
                        />
                      </div>
                    )}

                    <Label className="text-slate-700 font-semibold">Project Name</Label>
                    <Input
                      required
                      placeholder="Enter project name"
                      value={projectForm.name}
                      onChange={(e) => setProjectForm({ ...projectForm, name: e.target.value })}
                      className="h-11"
                    />

                    <Label className="text-slate-700 font-semibold">Project Description</Label>
                    <Textarea
                      required
                      placeholder="Enter project description"
                      value={projectForm.description}
                      onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                      rows={4}
                      className="resize-none"
                    />

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      disabled={submitting}
                    >
                      {submitting ? 'Adding...' : 'Add Project'}
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-sm text-slate-500 mt-2">
                      Images will be automatically cropped to 450x350 pixels when uploaded
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Projects</CardTitle>
                <CardDescription>Manage your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {projects.map((project) => (
                    <div key={project.id} className="flex items-center gap-4 p-4 border border-emerald-100 rounded-lg hover:shadow-md transition-shadow">
                      <img src={project.imageUrl} alt={project.name} className="h-20 w-20 object-cover rounded-lg" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg">{project.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2">{project.description}</p>
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete('projects', project.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="space-y-6">
            <Card className="border-teal-100">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-teal-600" />
                  Add New Client
                </CardTitle>
                <CardDescription>Create a new client with image (file or URL)</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddClient} className="space-y-4">
                  <div className="space-y-4 p-4 bg-slate-50 rounded-xl">
                    <div className="text-sm font-semibold mb-3">Choose Image Source</div>
                      <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="clientImageSource"
                          value="file"
                          checked={clientForm.imageSource === 'file'}
                          onChange={() => setClientForm({ ...clientForm, imageSource: 'file', imageUrl: '' })}
                          className="w-4 h-4"
                        />
                        <span>Upload File</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="clientImageSource"
                          value="url"
                          checked={clientForm.imageSource === 'url'}
                          onChange={() => setClientForm({ ...clientForm, imageSource: 'url', imageUrl: '' })}
                          className="w-4 h-4"
                        />
                        <span>Image URL</span>
                      </label>
                    </div>

                    {clientForm.imageSource === 'file' && (
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Upload Image</Label>
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => setClientForm({ ...clientForm, image: e.target.files?.[0] || null, imageSource: 'file' })}
                          required
                          className="h-11"
                        />
                      </div>
                    )}

                    {clientForm.imageSource === 'url' && (
                      <div className="space-y-2">
                        <Label className="text-slate-700 font-semibold">Image URL</Label>
                        <Input
                          required
                          placeholder="https://example.com/image.jpg"
                          value={clientForm.imageUrl}
                          onChange={(e) => setClientForm({ ...clientForm, imageUrl: e.target.value, imageSource: 'url' })}
                          className="h-11"
                        />
                      </div>
                    )}

                    <Label className="text-slate-700 font-semibold">Client Name</Label>
                    <Input
                      required
                      placeholder="Enter client name"
                      value={clientForm.name}
                      onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                      className="h-11"
                    />

                    <Label className="text-slate-700 font-semibold">Client Description</Label>
                    <Textarea
                      required
                      placeholder="Enter client testimonial"
                      value={clientForm.description}
                      onChange={(e) => setClientForm({ ...clientForm, description: e.target.value })}
                      rows={4}
                      className="resize-none"
                    />

                    <Label className="text-slate-700 font-semibold">Designation</Label>
                    <Input
                      required
                      placeholder="Enter designation (e.g., CEO, CTO)"
                      value={clientForm.designation}
                      onChange={(e) => setClientForm({ ...clientForm, designation: e.target.value })}
                      className="h-11"
                    />

                    <Button
                      type="submit"
                      className="w-full h-11 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                      disabled={submitting}
                    >
                      {submitting ? 'Adding...' : 'Add Client'}
                    </Button>
                  </div>

                  <div className="border-t pt-4">
                    <div className="text-sm text-slate-500 mt-2">
                      Images will be automatically cropped to 450x350 pixels when uploaded
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Clients</CardTitle>
                <CardDescription>Manage your clients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  {clients.map((client) => (
                    <div key={client.id} className="flex items-center gap-4 p-4 border-teal-100 rounded-lg hover:shadow-md transition-shadow">
                      <img src={client.imageUrl} alt={client.name} className="h-20 w-20 object-cover rounded-full" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg">{client.name}</h3>
                        <p className="text-sm text-slate-500 line-clamp-2">{client.designation}</p>
                      </div>
                      <Button variant="destructive" size="icon" onClick={() => handleDelete('clients', client.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-emerald-600" />
                  Contact Submissions
                </CardTitle>
                <CardDescription>View all contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-center text-slate-500 py-12">No contact submissions yet.</p>
                ) : (
                  <div className="overflow-x-auto max-h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Mobile</TableHead>
                          <TableHead>City</TableHead>
                          <TableHead>Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {contacts.map((contact) => (
                          <TableRow key={contact.id}>
                            <TableCell>{contact.name}</TableCell>
                            <TableCell>{contact.email}</TableCell>
                            <TableCell>{contact.mobile}</TableCell>
                            <TableCell>{contact.city}</TableCell>
                            <TableCell>{new Date(contact.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-teal-600" />
                  Newsletter Subscribers
                </CardTitle>
                <CardDescription>View all newsletter subscribers</CardDescription>
              </CardHeader>
              <CardContent>
                {subscribers.length === 0 ? (
                  <p className="text-center text-slate-500 py-12">No subscribers yet.</p>
                ) : (
                  <div className="overflow-x-auto max-h-[400px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Email</TableHead>
                          <TableHead>Subscribed Date</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {subscribers.map((subscriber) => (
                          <TableRow key={subscriber.id}>
                            <TableCell className="font-medium">{subscriber.email}</TableCell>
                            <TableCell>{new Date(subscriber.createdAt).toLocaleDateString()}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
}

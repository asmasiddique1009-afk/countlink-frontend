import { useState } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PauseIcon, PlayIcon, TrashIcon } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger } from
"@/components/ui/alert-dialog";






export function ProjectSettingsTab({ project, onBack }) {
  const { updateProject, deleteProject } = useProjectStore();
  const [name, setName] = useState(project.name);
  const [category, setCategory] = useState(project.category);

  const handleSave = () => {
    updateProject(project.id, { name, category });
  };

  const handleToggleStatus = () => {
    const newStatus = project.status === 'active' ? 'paused' : 'active';
    updateProject(project.id, { status: newStatus });
  };

  const handleDelete = () => {
    deleteProject(project.id);
    onBack();
  };

  return (
    <div className="space-y-6 max-w-3xl">
      {/* General Settings */}
      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-base font-semibold">General Settings</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Project Name</Label>
            <Input
              id="projectName"
              value={name}
              onChange={(e) => setName(e.target.value)} />
            
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Technology">Technology</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Health">Health</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Travel">Travel</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="pt-2">
            <Button onClick={handleSave} className="bg-primary text-primary-foreground hover:bg-primary/90">
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Project Status */}
      <Card className="border-border shadow-sm">
        <CardHeader className="border-b border-border py-4">
          <CardTitle className="text-base font-semibold">Project Status</CardTitle>
          <CardDescription>Pause or resume this project's activity.</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium text-foreground">
                Current Status: <span className="capitalize font-bold">{project.status}</span>
              </p>
              <p className="text-sm text-muted-foreground">
                {project.status === 'active' ?
                'Project is active and can receive new orders.' :
                'Project is paused. No new orders can be created.'}
              </p>
            </div>
            <Button
              variant="outline"
              onClick={handleToggleStatus}
              className={project.status === 'active' ? "border-amber-200 text-amber-700 hover:bg-amber-50" : "border-emerald-200 text-emerald-700 hover:bg-emerald-50"}>
              
              {project.status === 'active' ?
              <>
                  <PauseIcon className="w-4 h-4 mr-2" /> Pause Project
                </> :

              <>
                  <PlayIcon className="w-4 h-4 mr-2" /> Resume Project
                </>
              }
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-rose-200 bg-rose-50/30 shadow-sm">
        <CardHeader className="border-b border-rose-100 py-4">
          <CardTitle className="text-base font-semibold text-rose-700">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium text-foreground">Delete Project</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete this project and all associated data. This action cannot be undone.
              </p>
            </div>
            
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="bg-rose-600 hover:bg-rose-700">
                  <TrashIcon className="w-4 h-4 mr-2" /> Delete Project
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the project 
                    <strong> {project.name}</strong> and remove all associated data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-rose-600 hover:bg-rose-700">
                    Delete Project
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>);

}
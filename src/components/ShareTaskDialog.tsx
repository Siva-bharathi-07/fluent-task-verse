
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { X, Mail, Copy, Check } from "lucide-react";
import { Task } from "@/pages/Dashboard";
import { useToast } from "@/hooks/use-toast";

interface ShareTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: Task;
  onUpdateTask: (updates: Partial<Task>) => void;
}

const ShareTaskDialog = ({ open, onOpenChange, task, onUpdateTask }: ShareTaskDialogProps) => {
  const [email, setEmail] = useState("");
  const [sharedEmails, setSharedEmails] = useState<string[]>(task.sharedWith || []);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleAddEmail = () => {
    if (!email.trim() || !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (sharedEmails.includes(email.trim())) {
      toast({
        title: "Email already added",
        description: "This email is already in the shared list.",
        variant: "destructive",
      });
      return;
    }

    const newSharedEmails = [...sharedEmails, email.trim()];
    setSharedEmails(newSharedEmails);
    setEmail("");
    
    toast({
      title: "Email added!",
      description: `${email.trim()} has been added to the shared list.`,
    });
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    const newSharedEmails = sharedEmails.filter(e => e !== emailToRemove);
    setSharedEmails(newSharedEmails);
    
    toast({
      title: "Email removed",
      description: `${emailToRemove} has been removed from the shared list.`,
    });
  };

  const handleSave = () => {
    const assignedTo = sharedEmails.length > 0 
      ? ["John Doe", ...sharedEmails.map(email => email.split("@")[0])]
      : ["John Doe"];

    onUpdateTask({
      sharedWith: sharedEmails,
      assignedTo
    });
    
    onOpenChange(false);
    
    toast({
      title: "Task sharing updated!",
      description: `Task is now shared with ${sharedEmails.length} people.`,
    });
  };

  const handleCopyLink = () => {
    const taskUrl = `${window.location.origin}/task/${task.id}`;
    navigator.clipboard.writeText(taskUrl);
    setCopied(true);
    
    toast({
      title: "Link copied!",
      description: "Task link has been copied to your clipboard.",
    });
    
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddEmail();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Share Task: {task.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Add Email Section */}
          <div>
            <Label htmlFor="email">Add people by email</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter email address"
                className="flex-1"
              />
              <Button onClick={handleAddEmail} className="bg-indigo-600 hover:bg-indigo-700">
                <Mail className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
          </div>

          {/* Shared Emails List */}
          {sharedEmails.length > 0 && (
            <div>
              <Label>Shared with:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {sharedEmails.map((sharedEmail) => (
                  <Badge key={sharedEmail} variant="secondary" className="flex items-center gap-1 px-3 py-1">
                    {sharedEmail}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 ml-1 hover:bg-gray-200"
                      onClick={() => handleRemoveEmail(sharedEmail)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Share Link Section */}
          <div>
            <Label>Or share via link</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={`${window.location.origin}/task/${task.id}`}
                readOnly
                className="flex-1 bg-gray-50"
              />
              <Button variant="outline" onClick={handleCopyLink}>
                {copied ? (
                  <Check className="h-4 w-4 mr-2 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4 mr-2" />
                )}
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Anyone with this link can view and edit this task
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700">
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareTaskDialog;

import Timer from "@/components/Timer";
import TodoList from "@/components/TodoList";
import NotesPanel from "@/components/NotesPanel";
import WhiteNoisePanel from "@/components/WhiteNoisePanel";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">FocusedBrew</h1>
        <p className="text-secondary">A warm space for meaningful progress</p>
      </div>
      <Timer />
      <TodoList />
      <NotesPanel />
      <WhiteNoisePanel />
    </div>
  );
}

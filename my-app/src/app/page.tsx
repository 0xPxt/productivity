import Timer from "@/components/Timer";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-foreground">FocusedBrew</h1>
        <p className="text-secondary">A calm place to get things done</p>
      </div>
      <Timer />
    </div>
  );
}

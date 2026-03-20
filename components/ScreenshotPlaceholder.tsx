interface ScreenshotPlaceholderProps {
  description: string;
}

export default function ScreenshotPlaceholder({
  description,
}: ScreenshotPlaceholderProps) {
  return (
    <div className="my-4 rounded-lg border border-gray-200 bg-gray-100 p-8 text-center text-sm text-gray-400">
      <span className="mr-1">&#128248;</span> Screenshot placeholder: {description}
    </div>
  );
}

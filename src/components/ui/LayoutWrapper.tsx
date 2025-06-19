type LayoutWrapperProps = {
  children: React.ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}
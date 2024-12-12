type Props = {
  children: React.ReactNode;
};
export function Container({ children }: Props) {
  return (
    <div className="mx-auto max-w-[1920px] md:px-2 xl:px-20 ">{children}</div>
  );
}

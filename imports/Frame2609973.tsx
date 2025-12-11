function Frame() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
      <div className="bg-[#d99a73] h-[47px] shrink-0 w-full" />
      <div className="bg-[#d8d2c7] h-[47px] shrink-0 w-full" />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
      <div className="bg-[#f7f6f3] h-[47px] shrink-0 w-full" />
      <div className="bg-[#7a746d] h-[47px] shrink-0 w-full" />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-col gap-[13px] items-start relative shrink-0 w-full">
      <div className="bg-[#9cab8a] h-[47px] shrink-0 w-full" />
    </div>
  );
}

export default function Frame3() {
  return (
    <div className="content-stretch flex flex-col gap-[29px] items-start relative size-full">
      <Frame />
      <Frame1 />
      <Frame2 />
    </div>
  );
}
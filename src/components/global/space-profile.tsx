import Image from "next/image";

// TODO : This component well be delete

const SpaceProfile = () => {
  return (
    <div className="flex items-center">
      <Image
        className="rounded-md"
        src={"/avatar/avatar2.png"}
        width={36}
        height={36}
        alt={"avatar"}
      />
      <div className="ml-3">
        <h1 className="text-sm font-semibold">Organization Profle</h1>
        <p className="text-xs text-muted-foreground line-clamp-1">
          This is the organization profile page
        </p>
      </div>
    </div>
  );
};
export default SpaceProfile;

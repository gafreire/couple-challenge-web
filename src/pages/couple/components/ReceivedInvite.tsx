import type { InviteWithUser } from "../../../types/couple.types";

const ReceivedInvite = ({ invites }: { invites: InviteWithUser[] }) => {
  return <div>Received Invite Component with {invites.length} invites</div>;
};

export default ReceivedInvite;

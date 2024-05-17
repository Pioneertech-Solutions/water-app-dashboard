export const UserAvatar = ({ username }) => {
  return <img
    className='h-10 w-10 rounded-full'
    src={`https://ui-avatars.com/api/?name=${username ?? 'user'}&background=d7e6fc&color=4287f5&rounded=true`}
    alt="Avatar"
  />
};

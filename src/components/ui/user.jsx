export const UserAvatar = ({ username }) => {
  return <img
    className='h-10 w-10 rounded-full'
    src={`https://ui-avatars.com/api/?name=${username ?? 'user'}&background=fff700&color=121211&rounded=true`}
    alt="Avatar"
  />
};

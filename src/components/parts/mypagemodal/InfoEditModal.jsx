function InfoEditModal() {
  return (
    <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
      <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
        <h1 class="mb-8 text-3xl text-center">Sign up</h1>
        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="fullname"
          placeholder="Full Name"
        />

        <input
          type="text"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
        />

        <input
          type="password"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
        />
        <input
          type="password"
          class="block border border-grey-light w-full p-3 rounded mb-4"
          name="confirm_password"
          placeholder="Confirm Password"
        />

        <button
          type="submit"
          class="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
        >
          Create Account
        </button>
      </div>
    </div>
  );
}

export default InfoEditModal;

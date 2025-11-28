import './App.css';
import { SignedIn, SignedOut, SignInButton, SignOutButton, UserButton } from '@clerk/clerk-react';

function App() {

  return (
    <>
      <h1>Welcome to Talent IQ</h1>

      <SignedOut>
        <SignInButton mode="modal">
          <button>
            Login
          </button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <SignOutButton mode="modal" />
      </SignedIn>

      <UserButton />

    </>
  );
}

export default App

import Contact, { contactConverter } from "$lib/models/contact";
import { firestore } from "$lib/modules/firebase";
import { getContacts } from "$lib/services/contact";
import { useAuth } from "$lib/store";
import {
  Anchor,
  AppShell,
  Avatar,
  Button,
  Header,
  Image,
  List,
  Navbar,
  Text,
} from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { collection, query, onSnapshot } from "firebase/firestore";
import React, { Component, Suspense, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const contactsQuery = query(
  collection(firestore, "contacts").withConverter(contactConverter)
);

const HomePage = () => {
  const user = useAuth((state) => state.user);

  const [contacts, handler] = useListState<Contact>([]);

  useEffect(() => {
    return onSnapshot(contactsQuery, (snapshot) => {
      handler.append(...snapshot.docs.map((result) => result.data()));
    });
  }, []);

  return (
    <div className="App">
      <AppShell
        header={
          <Header height={60} p="xs">
            <Avatar src={user?.photoURL} alt={user?.displayName!} radius="xl" />
          </Header>
        }
        navbar={
          <Navbar
            p="md"
            hiddenBreakpoint="sm"
            hidden={!true}
            width={{ sm: 300, lg: 400 }}
          >
            {contacts.length > 0 && (
              <List listStyleType="none" spacing={2}>
                {contacts.map((c) => (
                  <List.Item key={c.name}>
                    <Button
                      fullWidth
                      component={NavLink}
                      variant="default"
                      to="/"
                    >
                      {c.name}
                    </Button>
                  </List.Item>
                ))}
              </List>
            )}
          </Navbar>
        }
      >
        <Text>Hi</Text>
      </AppShell>
    </div>
  );
};

export default HomePage;

class ErrorBoundary extends Component<{
  fallback: React.ReactNode;
  children: React.ReactNode;
}> {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error: Error) {
    return {
      hasError: true,
      error,
    };
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

import {MainHeader} from "./MainHeader";
import {Burger} from "./Burger";
import {NavLinks} from "./NavLinks";
import {Sidebar} from "./Sidebar";
import {useState} from "react";
import styled from "styled-components/macro";

export const MainNavigation = () => {

    const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

    const toggleSidebar = () => {
        setSidebarIsOpen(!sidebarIsOpen)
    }

    return (
        <>
            <MainHeader>
                <Sidebar isOpen={sidebarIsOpen} onClick={toggleSidebar}>
                    <SideNav>
                        <NavLinks/>
                    </SideNav>
                </Sidebar>

                <TitleWrapper>
                    <Burger onClick={toggleSidebar} isOpen={sidebarIsOpen}/>
                    <StyledH1>App title</StyledH1>
                </TitleWrapper>

                <HeaderNav>
                    <NavLinks/>
                </HeaderNav>
            </MainHeader>
        </>
    )
}

// Styles

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
`

const StyledH1 = styled.h1`
  margin-left: 2rem;
`

const SideNav = styled.nav`

`

const HeaderNav = styled.nav`
  display: flex;
  justify-self: end;

  & ul {
    display: flex;
  }
`
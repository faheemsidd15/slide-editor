import React, { Component } from "react"
import "./App.css"
import styled from "styled-components"

import Draggable from "react-draggable"
import { RIEInput } from "riek"

import chevron from "./icons/chevron-down.svg"
import monitor from "./icons/monitor.svg"
import clock from "./icons/clock.svg"
import copy from "./icons/copy.svg"
import trash from "./icons/trash-2.svg"
import upArrow from "./icons/arrow-up.svg"
import upArrowWhite from "./icons/arrow-up-white.svg"
import downArrow from "./icons/arrow-down.svg"
import downArrowWhite from "./icons/arrow-down-white.svg"
import edit from "./icons/edit-3.svg"
import plusSquare from "./icons/plus-square.svg"

const Header = styled.div`
  height: 6vh;
  display: flex;
  padding: 0 1%;
  background: white;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(235, 240, 244, 1);
`

const HeaderActions = styled.div`display: flex;`

const HeaderSlideTitle = styled.div`
  font-weight: 600;
  display: flex;
  align-items: center;
`

const Button = styled.div`
  cursor: pointer;
  color: white;
  padding: 6px 10px;
  font-size: 13px;
  margin: 0 10px;
  border-radius: 3px;
  background: ${props => (props.primary ? "rgba(99, 141, 230, 1.0)" : "rgba(205, 217, 246, 1.0)")};
`

const TemplateOption = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid rgba(235, 240, 244, 1);
  height: 4vh;
  padding: 0 10px;
  color: rgba(64, 75, 84, 0.8);
  cursor: pointer;
  position: relative;
`

const TemplateOptionIcon = styled.img`margin-right: 10px;`

const BackgroundColorSelector = styled.div`
  width: 10px;
  height: 10px;
  background: rgba(0, 89, 200, 1);
  border-radius: 3px;
  margin-right: 5px;
`

const TemplateSettings = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
  width: 100%;
  background: white;
  padding-left: 15px;
  border-bottom: 1px solid rgba(232, 238, 242, 1);
`

const Chevron = styled.img`margin-left: 10px;`

const MainContent = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
`

const Sidebar = styled.div`
  margin-left: 10px;
  margin-top: 10px;
  width: 200px;
  height: 280px;
  background: white;
  padding: 25px 10px;
  box-shadow: 0 8px 14px 0 rgba(223, 226, 229, 0.5);
`

const SidebarOption = styled.div`
  background: rgba(232, 238, 242, 1);
  margin: 10px 0;
  border-radius: 3px;
  padding: 10px;
  text-align: center;
  cursor: pointer;
`

const EditorWindow = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${props => (props.organizerOpen ? "80vh" : "89.2vh")};
  overflow: scroll;
`

const Editor = styled.div`
  position: relative;
  width: 1920px;
  height: 1080px;
`

const SlideOrganizer = styled.div`
  width: 100%;
  height: ${props => (props.open ? "75px" : "5px")};
  background: rgba(64, 77, 175, 1);
  border-top: 5px solid rgba(64, 77, 175, 1);
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
`

const Slide = styled.div`
  margin: 0 20px;
  text-align: center;
  cursor: move;

  span {
    color: white;
    font-size: 12px;
  }
`

const AddSlide = styled.div`
  width: 75px;
  height: 55px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  border: 2px dashed rgba(255, 255, 255, 0.1);
  cursor: pointer;
`

const SlideIcon = styled.div`
  height: 40px;
  width: 75px;
  background: white;
  border: 1px solid rgba(44, 57, 155, 1);
`

const SlideOptions = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(255, 255, 255, 0.2);
  width: 50px;
  height: calc(100% - 75px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 50px 0;

  div {
    display: flex;
    flex-direction: column;

    img {
      margin: 10px 0;
    }
  }
`

const SlideOrganizerTab = styled.div`
  position: absolute;
  left: 0;
  top: -30px;
  background: rgba(64, 77, 175, 1);
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TemplateOptionDropdown = styled.div`
  position: absolute;
  top: 4.2vh;
  left: 0;
  width: 100%;
  background: white;
  padding: 10px;
  z-index: 10;
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  box-shadow: 0 8px 14px 0 #dee2e5;

  ul {
    list-style-type: none;

    li {
      padding: 10px;
      cursor: pointer;
      border-radius: 5px;

      &:not(:last-child) {
        border-bottom: 1px solid rgba(250, 250, 250, 1);
      }

      &:hover {
        background: rgba(250, 250, 250, 1);
      }
    }
  }
`

class App extends Component {
  constructor() {
    super()

    this.state = {
      slideOrganizerOpen: true,
      slideLimitReached: false,
      nextSlideId: 4,
      slides: [
        { id: 1, time: "00:30 sec", title: "LRC Slide" },
        { id: 2, time: "00:30 sec", title: "Steves Test Slide" },
        { id: 3, time: "1:00 min", title: "Who knows, who cares" }
      ],
      activeSlide: { id: 1, time: "00:30 sec", title: "LRC Slide" }
    }

    this.insertSlide = this.insertSlide.bind(this)
    this.setActiveSlide = this.setActiveSlide.bind(this)
    this.onTitleChange = this.onTitleChange.bind(this)
    this.validateTitleChange = this.validateTitleChange.bind(this)
    this.toggleOrganizer = this.toggleOrganizer.bind(this)
  }

  toggleOrganizer() {
    this.setState(oldState => {
      return {
        ...oldState,
        slideOrganizerOpen: !oldState.slideOrganizerOpen
      }
    })
  }

  onTitleChange({ title }) {
    // todo .. splice out the activeSlide from slides, update its values, and put it back into slides
    this.setState(oldState => {
      return {
        ...oldState,
        slides: oldState.slides.map(
          slide => (slide.id === oldState.activeSlide.id ? { ...oldState.activeSlide, title } : slide)
        ),
        activeSlide: { ...oldState.activeSlide, title }
      }
    })
  }

  validateTitleChange(title) {
    return title.trim().length > 0
  }

  setActiveSlide(slide) {
    this.setState({
      activeSlide: slide
    })
  }

  insertSlide() {
    this.setState(oldState => {
      return {
        ...oldState,
        slides: [...oldState.slides, { id: oldState.nextSlideId, time: ":30 sec", title: "Untitled Slide" }],
        nextSlideId: oldState.nextSlideId + 1,
        slideLimitReached: oldState.slides.length + 1 >= 7
      }
    })
  }

  render() {
    return (
      <div className="App">
        <Header>
          <HeaderSlideTitle>
            <RIEInput
              value={this.state.activeSlide.title}
              change={this.onTitleChange}
              validate={this.validateTitleChange}
              propName="title"
            />

            <img alt="" style={{ marginLeft: "5px" }} src={edit} />
          </HeaderSlideTitle>
          <HeaderActions>
            <Button>Activate</Button>
            <Button primary="true">Save</Button>
          </HeaderActions>
        </Header>

        <div className="Main">
          {this.state.activeSlide && (
            <TemplateSettings>
              <TemplateOption>
                <TemplateOptionIcon src={clock} /> 30 sec <Chevron src={chevron} />{" "}
              </TemplateOption>
              <TemplateOption>
                Source Sans Pro <Chevron src={chevron} />{" "}
              </TemplateOption>
              <TemplateOption>
                <BackgroundColorSelector /> Background <Chevron src={chevron} />{" "}
              </TemplateOption>
              <TemplateOption>
                <TemplateOptionIcon src={monitor} /> 1920x1080 <Chevron src={chevron} />{" "}
                <TemplateOptionDropdown>
                  <ul>
                    <li>1920x1080</li>
                    <li>1366x768</li>
                    <li>1080x1920</li>
                    <li>768x1366</li>
                    <li>Responsive</li>
                  </ul>
                </TemplateOptionDropdown>
              </TemplateOption>
            </TemplateSettings>
          )}

          <MainContent>
            <Draggable bounds="parent">
              <Sidebar>
                <h1 className="sidebar-heading">Available Widgets</h1>
                <div className="sidebar-options">
                  <SidebarOption>Apps</SidebarOption>
                  <SidebarOption>Media</SidebarOption>
                  <SidebarOption>Text</SidebarOption>
                  <SidebarOption>Touch</SidebarOption>
                </div>
              </Sidebar>
            </Draggable>

            <EditorWindow organizerOpen={this.state.slideOrganizerOpen}>
              <Editor />
              {
                <SlideOptions>
                  <img alt="" src={upArrow} />
                  <div>
                    <img alt="" src={copy} />
                    <img alt="" src={trash} />
                  </div>
                  <img alt="" src={downArrow} />
                </SlideOptions>
              }

              <SlideOrganizer open={this.state.slideOrganizerOpen}>
                <SlideOrganizerTab onClick={this.toggleOrganizer}>
                  <img alt="" src={this.state.slideOrganizerOpen ? downArrowWhite : upArrowWhite} />
                </SlideOrganizerTab>

                {this.state.slideOrganizerOpen &&
                  this.state.slides.map((slide, key) => {
                    return (
                      <Slide key={key} onClick={() => this.setActiveSlide(slide)}>
                        <SlideIcon />
                        <span>{slide.time}</span>
                      </Slide>
                    )
                  })}

                {this.state.slideOrganizerOpen &&
                !this.state.slideLimitReached && (
                  <AddSlide onClick={this.insertSlide}>
                    <img alt="" src={plusSquare} />
                  </AddSlide>
                )}
              </SlideOrganizer>
            </EditorWindow>
          </MainContent>
        </div>
      </div>
    )
  }
}

export default App

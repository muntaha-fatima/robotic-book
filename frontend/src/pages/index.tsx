import React from 'react';
import Layout from '@theme/Layout';
import RAGChatbot from '../components/RAGChatbot';
import UrduTranslateButton from '../components/UrduTranslateButton';
import PersonalizeButton from '../components/PersonalizeButton';

const IndexPage = () => {
  return (
    <Layout title="Physical AI & Humanoid Robotics" description="Bridging digital AI and physical embodiment for humanoid robots">
      <div style={{
        margin: 0,
        padding: 0,
        fontFamily: 'var(--ifm-font-family-base)',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 30%, #334155 70%, #475569 100%)',
        position: 'relative',
        overflow: 'hidden',
        color: 'white',
      }}>
        {/* Elegant background pattern */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0
        }}></div>
        {/* Elegant background pattern */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23475569' fill-opacity='0.15'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          zIndex: 0
        }}></div>

        {/* Header Section - Robot Image on Top */}
        <header style={{
          padding: '2rem 2rem 4rem',
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.1) 0%, transparent 70%)',
            zIndex: -1
          }}></div>

          {/* Content container with vertical layout - image on top, text below */}
          <div className="content-col" style={{
            maxWidth: '1200px',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            padding: '0 2rem'
          }}>
            {/* Robot Image on Top */}
            <div className="content-image" style={{
              maxWidth: '600px',
              maxHeight: '500px',
              width: '100%',
              borderRadius: '20px',
              overflow: 'hidden',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}>
              {/* Robot image */}
              <img
                src="/robo.png"
                alt="Advanced AI Robotic Companion representing the future of humanoid robotics"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  border: 'none',
                  outline: 'none',
                  boxShadow: 'none'
                }}
              />
            </div>

            {/* Text Content Below Image */}
            <div className="content-left" style={{
              textAlign: 'center',
              maxWidth: '800px'
            }}>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: '800',
                marginBottom: '1.5rem',
                lineHeight: '1.1',
                textShadow: '0 4px 20px rgba(0,0,0,0.4)',
                background: 'linear-gradient(135deg, #60a5fa, #38bdf8, #0ea5e9)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontFamily: 'var(--ifm-font-family-base)',
                letterSpacing: '-0.02em'
              }}>
                Physical AI & Humanoid Robotics
              </h1>

              <p style={{
                fontSize: '1.4rem',
                marginBottom: '1.75rem',
                lineHeight: '1.7',
                color: '#e2e8f0',
                fontWeight: '400',
                textShadow: '0 2px 4px rgba(0,0,0,0.6)',
                background: 'linear-gradient(to bottom, #cbd5e1, #94a3b8)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Advancing the convergence of artificial intelligence and humanoid robotics to develop sophisticated machines capable of autonomous interaction with the physical world
              </p>

              <div style={{
                display: 'inline-block',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'rgba(148, 163, 184, 0.15)',
                borderRadius: '50px',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                margin: '0 0 3rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(8px)'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  margin: 0,
                  color: '#cbd5e1',
                  fontWeight: '500',
                  fontStyle: 'italic'
                }}>
                  Design by Seerat Fatima
                </p>
              </div>

              <div style={{
                margin: '0 0 3rem',
                padding: '1.5rem',
                backgroundColor: 'rgba(30, 41, 59, 0.6)',
                borderRadius: '16px',
                border: '2px solid #38bdf8',
                backdropFilter: 'blur(10px)',
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)'
              }}>
                <p style={{
                  fontSize: '1.1rem',
                  margin: '0 0 1rem',
                  color: '#e2e8f0',
                  fontWeight: '400',
                  lineHeight: '1.7'
                }}>
                  Seerat Fatima's journey in design began with a passion for creating intuitive user experiences. Starting with fundamental design principles, she has developed expertise in creating modern, functional interfaces that bridge the gap between aesthetics and usability. Her work focuses on clean, professional designs that enhance user engagement and satisfaction.
                </p>
                <p style={{
                  fontSize: '1.1rem',
                  margin: 0,
                  color: '#e2e8f0',
                  fontWeight: '400',
                  lineHeight: '1.7'
                }}>
                  With experience in various design methodologies and technologies, Seerat continues to evolve her craft by staying current with design trends and user experience research. Her approach emphasizes user-centered design, accessibility, and visual harmony to create compelling digital experiences.
                </p>
              </div>

              <div className="cta-buttons" style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <a
                  href="/docs/intro"
                  className="cta-button"
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'rgba(56, 189, 248, 0.2)',
                    color: '#e0f2fe',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    border: '1px solid rgba(56, 189, 248, 0.4)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.3)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(56, 189, 248, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.2)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  Explore Documentation
                </a>
                <a
                  href="/signup"
                  className="cta-button"
                  style={{
                    padding: '1rem 2rem',
                    backgroundColor: 'rgba(16, 185, 129, 0.2)',
                    color: '#e0f2fe',
                    textDecoration: 'none',
                    borderRadius: '50px',
                    fontWeight: '700',
                    fontSize: '1.1rem',
                    border: '1px solid rgba(16, 185, 129, 0.4)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3), 0 0 20px rgba(16, 185, 129, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
                  }}
                >
                  Join Platform
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Features Section */}
        <section className="section-padding" style={{
          padding: '6rem 2rem',
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <h2 style={{
              textAlign: 'center',
              fontSize: '2.5rem',
              marginBottom: '4rem',
              fontWeight: '700',
              background: 'linear-gradient(to right, #bae6fd, #7dd3fc, #38bdf8)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Core Research Areas
            </h2>

            <div className="features-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2.5rem'
            }}>
              <div className="feature-card" style={{
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 30px rgba(56, 189, 248, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
              }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 20px rgba(2, 132, 199, 0.3)'
                  }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4 15C4 15.5304 4.21071 16.0391 4.58579 16.4142C4.96086 16.7893 5.46957 17 6 17C6.53043 17 7.03914 16.7893 7.41421 16.4142C7.78929 16.0391 8 15.5304 8 15M4 15C4 14.4696 4.21071 13.9609 4.58579 13.5858C4.96086 13.2107 5.46957 13 6 13C6.53043 13 7.03914 13.2107 7.41421 13.5858C7.78929 13.9609 8 14.4696 8 15ZM20 15C20 15.5304 19.7893 16.0391 19.4142 16.4142C19.0391 16.7893 18.5304 17 18 17C17.4696 17 16.9609 16.7893 16.5858 16.4142C16.2107 16.0391 16 15.5304 16 15M20 15C20 14.4696 19.7893 13.9609 19.4142 13.5858C19.0391 13.2107 18.5304 13 18 13C17.4696 13 16.9609 13.2107 16.5858 13.5858C16.2107 13.9609 16 14.4696 16 15ZM12 4V12M12 12V20M12 12H16M12 12H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="feature-title" style={{
                    fontSize: '1.75rem',
                    marginBottom: '1rem',
                    color: '#e0f2fe',
                    fontWeight: '700'
                  }}>
                    ROS 2 Ecosystem
                  </h3>
                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.7',
                    fontSize: '1.1rem'
                  }}>
                    Advanced middleware for complex humanoid robot control, including nodes, topics, services, and URDF for robot description.
                  </p>
                </div>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(2, 132, 199, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)',
                  zIndex: 1
                }}></div>
              </div>

              <div style={{
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 30px rgba(56, 189, 248, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
              }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 20px rgba(5, 150, 105, 0.3)'
                  }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="white" strokeWidth="2"/>
                      <path d="M19.0001 14C19.0001 14.5 19.0001 15.5 19.0001 16C19.0001 19.866 15.866 23 12.0001 23C8.13413 23 5.00012 19.866 5.00012 16C5.00012 12.134 8.13413 9 12.0001 9C12.5001 9 13.5001 9 14.0001 9M21.0001 10C21.0001 8.34315 20.3432 6.75487 19.1821 5.5846C18.0209 4.41433 16.4391 3.7499 14.8001 3.7499C13.1611 3.7499 11.5793 4.41433 10.4182 5.5846C9.25707 6.75487 8.60013 8.34315 8.60013 10C8.60013 11.6569 9.25707 13.2451 10.4182 14.4154C11.5793 15.5857 13.1611 16.2501 14.8001 16.2501C16.4391 16.2501 18.0209 15.5857 19.1821 14.4154C20.3432 13.2451 21.0001 11.6569 21.0001 10Z" stroke="white" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3 className="feature-title" style={{
                    fontSize: '1.75rem',
                    marginBottom: '1rem',
                    color: '#e0f2fe',
                    fontWeight: '700'
                  }}>
                    Digital Twin Simulation
                  </h3>
                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.7',
                    fontSize: '1.1rem'
                  }}>
                    Physics-based simulation environments using Gazebo and Unity for testing humanoid locomotion and behaviors in virtual worlds.
                  </p>
                </div>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(5, 150, 105, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)',
                  zIndex: 1
                }}></div>
              </div>

              <div className="feature-card" style={{
                backgroundColor: 'rgba(30, 41, 59, 0.7)',
                borderRadius: '20px',
                padding: '2.5rem',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                backdropFilter: 'blur(10px)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 20px 40px -10px rgba(0, 0, 0, 0.4), 0 0 30px rgba(56, 189, 248, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(0, 0, 0, 0.2)';
              }}>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '15px',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.5rem',
                    boxShadow: '0 8px 20px rgba(217, 119, 6, 0.3)'
                  }}>
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 9V10C20 10.8856 19.7483 11.7345 19.292 12.457C18.8356 13.1795 18.1999 13.7421 17.4574 14.0803C16.7149 14.4186 15.8965 14.5185 15.0972 14.3677C14.2979 14.2168 13.552 13.8215 12.9502 13.22L12 12.2697M4 7H10L11.2697 8.26967C11.6191 8.61908 11.8303 9.08536 11.8678 9.5732C11.9053 10.061 11.7668 10.544 11.4777 10.9269L7.5 16H4V7ZM14 11L15.2697 12.2697C15.6191 12.6191 15.8303 13.0854 15.8678 13.5732C15.9053 14.061 15.7668 14.544 15.4777 14.9269L11.5 19H8V14M4 7L6.58579 9.58579C6.94672 9.94672 7.44377 10.1421 7.94975 10.1421C8.45573 10.1421 8.95279 9.94672 9.31371 9.58579L12 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h3 className="feature-title" style={{
                    fontSize: '1.75rem',
                    marginBottom: '1rem',
                    color: '#e0f2fe',
                    fontWeight: '700'
                  }}>
                    NVIDIA Isaac AI
                  </h3>
                  <p style={{
                    color: '#cbd5e1',
                    lineHeight: '1.7',
                    fontSize: '1.1rem'
                  }}>
                    Hardware-accelerated AI for perception, navigation, and manipulation using Isaac Sim and Isaac ROS packages.
                  </p>
                </div>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: 'radial-gradient(circle, rgba(217, 119, 6, 0.1) 0%, transparent 70%)',
                  borderRadius: '50%',
                  transform: 'translate(30%, -30%)',
                  zIndex: 1
                }}></div>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Section - with refined styling */}
        <section className="section-padding" style={{
          padding: '6rem 2rem',
          position: 'relative',
          zIndex: 2,
          backgroundColor: 'rgba(15, 23, 42, 0.8)',
          backdropFilter: 'blur(10px)'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '2.5rem',
              marginBottom: '3rem',
              fontWeight: '700',
              background: 'linear-gradient(to right, #f0f9ff, #e0f2fe, #bae6fd)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Interactive Robotics Assistant
            </h2>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1.5rem',
              marginBottom: '3rem'
            }}>
              <div style={{
                display: 'flex',
                gap: '1rem',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <UrduTranslateButton />
                <PersonalizeButton />
              </div>
            </div>

            <div style={{
              width: '100%',
              maxWidth: '800px',
              margin: '0 auto',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
              border: '1px solid rgba(148, 163, 184, 0.3)'
            }}>
              <RAGChatbot isModal={false} />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-padding" style={{
          padding: '6rem 2rem',
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9) 0%, rgba(30, 41, 59, 0.95) 100%)',
          color: 'white',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.1) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(16, 185, 129, 0.1) 0%, transparent 40%)',
            zIndex: 1
          }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{
              fontSize: '3rem',
              marginBottom: '1.5rem',
              fontWeight: '800',
              lineHeight: '1.2',
              background: 'linear-gradient(to right, #e0f2fe, #bae6fd, #80caff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Ready to Advance Your Research?
            </h2>

            <p style={{
              fontSize: '1.5rem',
              maxWidth: '700px',
              margin: '0 auto 3rem',
              lineHeight: '1.7',
              color: '#cbd5e1'
            }}>
              Join our community of researchers and developers pushing the boundaries of humanoid robotics
            </p>

            <div style={{
              display: 'flex',
              gap: '1.5rem',
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}>
              <a
                href="/docs/intro"
                style={{
                  padding: '1.2rem 2.5rem',
                  backgroundColor: 'rgba(56, 189, 248, 0.2)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.3)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 25px rgba(56, 189, 248, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'rgba(56, 189, 248, 0.2)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Get Started
              </a>
              <a
                href="/signup"
                style={{
                  padding: '1.2rem 2.5rem',
                  backgroundColor: 'rgba(16, 185, 129, 0.2)',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '50px',
                  fontWeight: '700',
                  fontSize: '1.1rem',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.3)';
                  e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3), 0 0 25px rgba(16, 185, 129, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.backgroundColor = 'rgba(16, 185, 129, 0.2)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.2)';
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 21V16H8V21M12 3V16M4 21H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Sign Up
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default IndexPage;
import React from 'react';
import RAGChatbot from '../components/RAGChatbot';
import UrduTranslateButton from '../components/UrduTranslateButton';
import PersonalizeButton from '../components/PersonalizeButton';

const IndexPage = () => {
  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Hero Section */}
      <section className="hero robotic-gradient-bg robotic-shadow robotic-fade-in-up" style={{
        textAlign: 'center',
        padding: '80px 20px',
        marginBottom: '50px',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.1) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.1) 0%, transparent 20%)',
          zIndex: 1
        }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 className="hero__title robotic-float" style={{
            marginBottom: '20px',
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            fontSize: '3.5rem'
          }}>
            Physical AI Humanoid Robotics
          </h1>
          <p className="robotic-fade-in-up robotic-delay-1" style={{
            fontSize: '1.4rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '800px',
            margin: '0 auto 30px',
            lineHeight: '1.6'
          }}>
            Bridging digital AI and physical embodiment for humanoid robots. Explore cutting-edge research and implementation in humanoid robotics.
          </p>
          <div className="robotic-fade-in-up robotic-delay-2" style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <a
              href="/docs/intro"
              className="robotic-ripple"
              style={{
                padding: '14px 30px',
                backgroundColor: 'white',
                color: 'var(--ifm-color-primary)',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                transition: 'var(--robotic-transition)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Get Started
            </a>
            <a
              href="/signup"
              className="robotic-ripple"
              style={{
                padding: '14px 30px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid white',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1rem',
                boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
                transition: 'var(--robotic-transition)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Join Community
            </a>
          </div>
        </div>
      </section>

      {/* Features/Modules Overview */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '25px', marginBottom: '40px' }}>
        <div className="robotic-card robotic-hover-lift robotic-fade-in-up robotic-delay-1" style={{
          padding: '30px',
          backgroundColor: 'white',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '8px',
            height: '100%',
            backgroundColor: 'var(--robotic-accent-3)',
          }}></div>
          <div style={{ paddingLeft: '20px' }}>
            <h2 style={{
              color: 'var(--robotic-accent-3)',
              marginBottom: '15px',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--robotic-accent-3)',
                color: 'white',
                textAlign: 'center',
                lineHeight: '32px',
                fontSize: '18px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle', marginTop: '-2px'}}>
                  <path d="M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7H18C19.1046 7 20 7.89543 20 9V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 3 19V9C3 7.89543 3.89543 7 5 7H8ZM10 5H14V7H10V5ZM8 9V11H6V19H18V11H16V9H8ZM10 13H14V15H10V13Z" fill="white"/>
                </svg>
              </span>
              ROS 2 for Humanoids
            </h2>
            <p style={{ lineHeight: '1.6', color: 'var(--robotic-gray-800)' }}>
              Understanding nodes, topics, services, and URDF for complex humanoid robot architectures.
            </p>
          </div>
        </div>
        <div className="robotic-card robotic-hover-lift robotic-fade-in-up robotic-delay-2" style={{
          padding: '30px',
          backgroundColor: 'white',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '8px',
            height: '100%',
            backgroundColor: 'var(--robotic-accent-1)',
          }}></div>
          <div style={{ paddingLeft: '20px' }}>
            <h2 style={{
              color: 'var(--robotic-accent-1)',
              marginBottom: '15px',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--robotic-accent-1)',
                color: 'white',
                textAlign: 'center',
                lineHeight: '32px',
                fontSize: '18px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle', marginTop: '-2px'}}>
                  <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 12 22V2C17.52 2 22 6.48 12 2Z" fill="white"/>
                  <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="white"/>
                  <path d="M12 6C13.6569 6 15 4.65685 15 3C15 1.34315 13.6569 -1.19209e-06 12 -1.19209e-06C10.3431 -1.19209e-06 9 1.34315 9 3C9 4.65685 10.3431 6 12 6Z" fill="white"/>
                  <path d="M12 22C13.6569 22 15 20.6569 15 19C15 17.3431 13.6569 16 12 16C10.3431 16 9 17.3431 9 19C9 20.6569 10.3431 22 12 22Z" fill="white"/>
                  <path d="M6 12C6 13.6569 4.65685 15 3 15C1.34315 15 -1.19209e-06 13.6569 -1.19209e-06 12C-1.19209e-06 10.3431 1.34315 9 3 9C4.65685 9 6 10.3431 6 12Z" fill="white"/>
                  <path d="M22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12Z" fill="white"/>
                </svg>
              </span>
              Digital Twin Simulation
            </h2>
            <p style={{ lineHeight: '1.6', color: 'var(--robotic-gray-800)' }}>
              Gazebo and Unity simulation environments for testing humanoid behaviors in virtual worlds.
            </p>
          </div>
        </div>
        <div className="robotic-card robotic-hover-lift robotic-fade-in-up robotic-delay-3" style={{
          padding: '30px',
          backgroundColor: 'white',
          minHeight: '220px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '8px',
            height: '100%',
            backgroundColor: 'var(--robotic-accent-2)',
          }}></div>
          <div style={{ paddingLeft: '20px' }}>
            <h2 style={{
              color: 'var(--robotic-accent-2)',
              marginBottom: '15px',
              fontSize: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              <span style={{
                display: 'inline-block',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--robotic-accent-2)',
                color: 'white',
                textAlign: 'center',
                lineHeight: '32px',
                fontSize: '18px'
              }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{verticalAlign: 'middle', marginTop: '-2px'}}>
                  <path d="M9 12L11 14L15 10M5 3C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3H5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              NVIDIA Isaac AI
            </h2>
            <p style={{ lineHeight: '1.6', color: 'var(--robotic-gray-800)' }}>
              Advanced AI capabilities for humanoid perception, navigation, and manipulation using Isaac Sim and ROS packages.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Section */}
      <section className="robotic-fade-in-up robotic-delay-4" style={{ marginBottom: '40px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#2c3e50' }}>Interactive Robotics Assistant</h2>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <UrduTranslateButton />
            <PersonalizeButton />
          </div>

          <div style={{ width: '100%', maxWidth: '800px', margin: '0 auto' }}>
            <RAGChatbot />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="robotic-card robotic-gradient-bg robotic-shadow robotic-fade-in-up robotic-delay-5" style={{
        textAlign: 'center',
        padding: '50px 30px',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        marginTop: '50px'
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 10% 20%, rgba(255,255,255,0.05) 0%, transparent 20%), radial-gradient(circle at 90% 80%, rgba(255,255,255,0.05) 0%, transparent 20%)',
          zIndex: 1
        }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h2 style={{
            marginBottom: '15px',
            color: 'white',
            fontSize: '2.25rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}>
            Ready to Explore Humanoid Robotics?
          </h2>
          <p style={{
            marginBottom: '30px',
            color: 'rgba(255,255,255,0.9)',
            fontSize: '1.2rem',
            maxWidth: '700px',
            margin: '0 auto 30px'
          }}>
            Dive deep into the documentation, access interactive tutorials, and join our community of robotics researchers and developers.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="/docs/intro"
              className="robotic-ripple"
              style={{
                padding: '16px 35px',
                backgroundColor: 'white',
                color: 'var(--ifm-color-primary)',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                transition: 'var(--robotic-transition)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <span>📚</span> Get Started
            </a>
            <a
              href="/signup"
              className="robotic-ripple"
              style={{
                padding: '16px 35px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.8)',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                transition: 'var(--robotic-transition)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>👥</span> Join Community
            </a>
            <a
              href="https://github.com/physical-ai-humanoid-robotics/physical-ai-humanoid-robotics"
              target="_blank"
              rel="noopener noreferrer"
              className="robotic-ripple"
              style={{
                padding: '16px 35px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.8)',
                textDecoration: 'none',
                borderRadius: '50px',
                fontWeight: 'bold',
                fontSize: '1.1rem',
                boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
                transition: 'var(--robotic-transition)',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <span>💻</span> View on GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndexPage;
import { useState, useEffect, useRef, Children, cloneElement, isValidElement, useCallback, useMemo, type ReactNode, type FC, type KeyboardEvent, type MouseEvent } from 'react';

interface DropdownProps {
  trigger: (isOpen: boolean) => ReactNode;
  children: ReactNode;
  menuAriaLabel: string;
}

const Dropdown: FC<DropdownProps> = ({ trigger, children, menuAriaLabel }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  const setTriggerRef = (node: HTMLElement | null) => {
    triggerRef.current = node;
  };

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: globalThis.MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  const handleKeyDown = useCallback((event: globalThis.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
      triggerRef.current?.focus();
    }
  }, []);

  // Handle keyboard events on the document for closing
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);


  const handleMenuKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        const menuItems = Array.from(dropdownRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]') || []);
        if (menuItems.length === 0) return;

        const currentItemIndex = menuItems.findIndex(item => item === document.activeElement);
        let nextItemIndex = -1;

        if (event.key === 'ArrowDown') {
            nextItemIndex = currentItemIndex < menuItems.length - 1 ? currentItemIndex + 1 : 0;
        } else { // ArrowUp
            nextItemIndex = currentItemIndex > 0 ? currentItemIndex - 1 : menuItems.length - 1;
        }
        if (nextItemIndex !== -1) {
            menuItems[nextItemIndex].focus();
        }
    }
  };

  const handleTriggerKeyDown = useCallback((event: KeyboardEvent) => {
      if(event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
          event.preventDefault();
          setIsOpen(true);
      }
  }, []);

  // Focus first item when menu opens
  useEffect(() => {
    if (isOpen) {
        const menuItems = dropdownRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
        menuItems?.[0]?.focus();
    }
  }, [isOpen]);

  // Clone trigger to add props
  const clonedTrigger = useMemo(() => {
    const triggerElement = trigger(isOpen);
    if (!isValidElement(triggerElement)) {
      return null;
    }
    return cloneElement(triggerElement as React.ReactElement<any>, {
        ref: setTriggerRef,
        onClick: (e: MouseEvent) => {
            handleToggle();
            if ((triggerElement.props as any).onClick) {
                (triggerElement.props as any).onClick(e);
            }
        },
        onKeyDown: (e: KeyboardEvent) => {
            handleTriggerKeyDown(e);
            if ((triggerElement.props as any).onKeyDown) {
                (triggerElement.props as any).onKeyDown(e);
            }
        },
        'aria-haspopup': 'menu',
        'aria-expanded': isOpen,
    });
  }, [trigger, isOpen, handleToggle, handleTriggerKeyDown]);
  
  return (
    <div className="relative" ref={dropdownRef}>
      {clonedTrigger}
      {isOpen && (
        <div 
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 origin-top rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none animate-fade-in-up z-50" 
          style={{animationDuration: '200ms'}}
          role="menu"
          aria-orientation="vertical"
          aria-label={menuAriaLabel}
          onKeyDown={handleMenuKeyDown}
        >
          <div className="py-1">
            {Children.map(children, (child) => {
                if (!isValidElement(child)) return child;
                const childProps = child.props as any;
                return cloneElement(child as React.ReactElement<any>, { 
                    onClick: (e: MouseEvent) => {
                        setIsOpen(false);
                        triggerRef.current?.focus();
                        if(childProps.onClick) {
                            childProps.onClick(e);
                        }
                    }
                });
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
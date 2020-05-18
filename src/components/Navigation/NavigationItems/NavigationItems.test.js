import {configure , shallow} from 'enzyme' ;
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem/NavigationItem'
import React from 'react';
import NavigationItems from './NavigationItems'


configure({adapter : new Adapter()})

describe('<NavigationItems>', () => {
     let wrapper ;
     beforeEach(()=>{
         wrapper = shallow(<NavigationItems />)
     })

    it('should render 2 navigation items  if not authenticated' , () => {
        
        expect(wrapper.find(NavigationItem)).toHaveLength(2)
    })
    it('should render 3 navigation items  if  authenticated' , () => {
       //  wrapper = shallow(<NavigationItems  isAuthenticated />)
        wrapper.setProps({isAuthenticated : true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3)
    })
    it('should render 3 navigation items  if  authenticated' , () => {
         wrapper.setProps({isAuthenticated : true})
         expect(wrapper.contains( <NavigationItem link= "/logout" >Logout</NavigationItem>)).toEqual(true)
     })
})
package com.easy2manage.backend.service.security;

import com.easy2manage.backend.dto.user.LoginUserDto;
import com.easy2manage.backend.model.user.User;
import com.easy2manage.backend.security.JwtTokenUtil;
import com.easy2manage.backend.service.AuthenticationService;
import com.easy2manage.backend.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Resource(name = "userDetailsService")
    private UserDetailsService userDetailsService;

    @Resource
    private AuthenticationManager authenticationManager;

    @Resource
    private JwtTokenUtil jwtTokenUtil;

    @Override
    public String login(LoginUserDto user) {
        try {
            return getToken(user);
        } catch (AuthenticationException e) {
            return null;
        }
    }

    private String getToken(LoginUserDto user) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                userDetails, user.getPassword(), userDetails.getAuthorities()
        );

        authenticationManager.authenticate(authenticationToken);

        if (authenticationToken.isAuthenticated()) {
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        return jwtTokenUtil.generateToken(authenticationToken);
    }
}

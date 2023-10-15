package kbs.filter;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kbs.constants.Constants;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;


@Component
public class AuthFilter extends OncePerRequestFilter {
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("token");

        if (token == null) {
            response.sendError(403);
            return;
        }

        try {
            // OK, we can trust this JWT
            Jwts.parser().setSigningKey(Constants.JWS_SECRET).parseClaimsJws(token);
            filterChain.doFilter(request, response);
        } catch (Exception e) {
            // Don't trust the JWT!
            System.out.println("JWT e: " + e.toString());
            response.sendError(403);
        }
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        if (path.equals("/auth/login") || path.equals("/users/sign-up")) {
            return true;
        }
        String method = request.getMethod();
        if (method.equals("OPTIONS")) {
            return true;
        }

        return false;
    }
}
